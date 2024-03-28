'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Compressor from 'compressorjs';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { excursionSchema } from '@/zod/excursionSchema';
import * as z from 'zod';
import addExcursionServer from '@/app/api/database/addExcursionServer';
import { ClipLoader } from 'react-spinners';
import deleteImage from '@/app/api/database/deleteImageFromStorage';
import updateExcursion from '@/app/api/database/updateExcursion';
import { IExcursion } from '@/interfaces/excursion.model';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

type NewExcursionData = z.infer<typeof excursionSchema>;
const ExcursionForm = (excursion: IExcursion | null) => {
  const [compressedFiles, setCompressedFiles] = useState<Array<File>>([]);
  const [excursionStatus, setExcursionStatus] = useState({
    isAdding: false,
    error: false,
    isAdded: false,
    isFileListEmpty: false,
  });
  const hours = Array.from({ length: 22 - 9 + 1 }, (_, index) => 9 + index);

  const {
    reset,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewExcursionData>({
    resolver: zodResolver(excursionSchema),
    defaultValues: {
      titleHr: excursion?.titleHr ?? '',
      titleEn: excursion?.titleEn ?? '',
      descEng: excursion?.descriptionEng ?? '',
      duration: excursion?.duration ?? 1,
      descCro: excursion?.descriptionCro ?? '',
      price: excursion?.price ?? 1,
      titleImage: excursion?.titleImage ?? '',
      maxPersons: excursion?.maxPersons ?? 1,
      isExcursionPublic: excursion?.isExcursionPublic ?? false,
      hours: excursion?.hours ?? [],
    },
  });

  useEffect(() => {
    reset({
      descEng: excursion?.descriptionEng,
      price: excursion?.price ?? 1,
      duration: excursion?.duration ?? 1,
      descCro: excursion?.descriptionCro,
      maxPersons: excursion?.maxPersons ?? 1,
      titleHr: excursion?.titleHr,
      titleEn: excursion?.titleEn,
      titleImage: excursion?.titleImage,
      isExcursionPublic: excursion?.isExcursionPublic,
      hours: excursion?.hours,
    });
  }, [excursion]);

  const deleteImageFromStorage = async (imageUrl: string) => {
    setExcursionStatus({ ...excursionStatus, isAdding: true });
    if (excursion?.id) await deleteImage(imageUrl, excursion?.id);
    setExcursionStatus({ ...excursionStatus, isAdding: false });
  };
  const blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  };
  const appendFilesToFormData = (
    formData: FormData,
    files: File[],
    key: string,
  ): void => {
    files.forEach((file, index) => {
      formData.append(`${key}[${index}]`, file);
    });
  };

  const addExcursion = async () => {
    if (excursion?.id) {
      if (compressedFiles.length === 0 && excursion?.images?.length === 0) {
        setExcursionStatus({ ...excursionStatus, isFileListEmpty: true });
        return;
      }
    } else {
      if (compressedFiles.length === 0) {
        setExcursionStatus({ ...excursionStatus, isFileListEmpty: true });
        return;
      }
    }

    if (getValues('titleImage') === undefined) return;

    const formData = new FormData();
    const imagesFormData = new FormData();
    setExcursionStatus({
      isAdding: true,
      error: false,
      isAdded: false,
      isFileListEmpty: false,
    });
    // Add data to FormData
    formData.append('titleHr', getValues('titleHr'));
    formData.append('titleEn', getValues('titleEn'));
    appendFilesToFormData(imagesFormData, compressedFiles, 'images');
    formData.append('duration', getValues('duration').toString());
    formData.append('descCro', getValues('descCro'));
    formData.append('descEng', getValues('descEng'));
    formData.append('price', getValues('price').toString());
    formData.append('maxPersons', getValues('maxPersons').toString());
    formData.append('titleImage', getValues('titleImage').toString());
    formData.append(
      'isExcursionPublic',
      getValues('isExcursionPublic').toString(),
    );
    formData.append('startingHours', JSON.stringify(getValues('hours')) ?? '');

    let status: boolean;

    if (!excursion?.id) {
      status = await addExcursionServer(formData, imagesFormData);
    } else {
      status = await updateExcursion(excursion.id, formData, imagesFormData);
    }
    if (status) {
      setCompressedFiles([]);
      setExcursionStatus({
        ...excursionStatus,
        isAdding: false,
        isAdded: true,
      });
      reset();
    } else {
      setExcursionStatus({ ...excursionStatus, isAdding: false, error: true });
    }
  };

  function filterImageFiles(fileList: FileList | null): File[] {
    const imageFiles: File[] = [];

    if (fileList?.length) {
      setExcursionStatus({ ...excursionStatus, isFileListEmpty: false });
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);

        // Check if the file is of image type
        if (file && file.type.startsWith('image/')) {
          imageFiles.push(file);
        }
      }
    }
    return imageFiles;
  }

  const handleIsImageRemoveDisabled = () => {
    if (excursionStatus.isAdding) {
      return true;
    } else if (
      excursion?.images?.length === 1 &&
      compressedFiles.length === 0
    ) {
      return true;
    } else
      return excursion?.images?.length === 0 && compressedFiles.length === 1;
  };
  const handleCompressedUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const images = filterImageFiles(e.currentTarget.files);

    if (images) {
      if (!getValues('titleImage')) setValue('titleImage', 0);
      const compressedFilesArray: Array<File> = compressedFiles;
      for (let i = 0; i < images.length; i++) {
        let imageItem = images[i];

        if (imageItem) {
          new Compressor(imageItem, {
            quality: 0.8,
            success: (compressedResult) => {
              if (compressedResult.type === 'Blob') {
                const convertedFile = blobToFile(
                  compressedResult,
                  imageItem?.name ?? '',
                );
                compressedFilesArray.push(convertedFile);
              } else {
                compressedFilesArray.push(compressedResult as File);
              }
              setCompressedFiles([...compressedFilesArray]);
            },
            error(error: Error) {
              console.log(error);
            },
          });
        }
      }
    }
  };

  return (
    <div className="newExcursionForm">
      <form
        onSubmit={handleSubmit(addExcursion)}
        className="newExcursionForm__form"
      >
        <h1 className="newExcursionForm__form__title">Nova eskurzija</h1>
        <div className="newExcursionForm__form__multipleInputs">
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="titleHr">Naziv eskurzije na Hrvatskom</label>
            <input
              type="text"
              id="titleHr"
              defaultValue={excursion?.titleHr}
              {...register('titleHr')}
              disabled={excursionStatus.isAdding}
            />
            {errors.titleHr && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.titleHr.message}
              </div>
            )}
          </div>{' '}
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="titleEn">Naziv eskurzije na Engleskom</label>
            <input
              type="text"
              id="titleEn"
              defaultValue={excursion?.titleEn}
              {...register('titleEn')}
              disabled={excursionStatus.isAdding}
            />
            {errors.titleEn && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.titleEn.message}
              </div>
            )}
          </div>
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="duration">Trajanje u satima</label>
            <input
              type="number"
              id="duration"
              defaultValue={1}
              disabled={excursionStatus.isAdding}
              min={1}
              {...register('duration')}
            />
            {errors.duration && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.duration.message}
              </div>
            )}
          </div>
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="price">Cijena u Eurima</label>
            <input
              disabled={excursionStatus.isAdding}
              type="number"
              id="price"
              defaultValue={1}
              min={1}
              {...register('price')}
            />
            {errors.price && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.price.message}
              </div>
            )}
          </div>{' '}
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="persons">Broj dozvoljenih osoba</label>
            <input
              disabled={excursionStatus.isAdding}
              type="number"
              id="persons"
              defaultValue={1}
              min={1}
              {...register('maxPersons')}
            />
            {errors.maxPersons && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.maxPersons.message}
              </div>
            )}
          </div>
        </div>
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="descHr">Opis eskurzije na hrvatskom</label>
          <textarea
            id="descHr"
            {...register('descCro')}
            rows={10}
            disabled={excursionStatus.isAdding}
          />
          {errors.descCro && (
            <div className="newExcursionForm__form__inputContainer__error">
              {errors.descCro.message}
            </div>
          )}
        </div>
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="descEn">Opis eskurzije na engleskom</label>
          <textarea
            id="descEn"
            {...register('descEng')}
            rows={10}
            disabled={excursionStatus.isAdding}
          />
          {errors.descEng && (
            <div className="newExcursionForm__form__inputContainer__error">
              {errors.descEng.message}
            </div>
          )}
        </div>
        <div className="newExcursionForm__form__checkboxContainer">
          <label htmlFor="isPrivate">Je li eskurzija javna</label>
          <input
            id="isPrivate"
            type={'checkbox'}
            {...register('isExcursionPublic')}
            disabled={excursionStatus.isAdding}
          />
          {errors.isExcursionPublic && (
            <div className="newExcursionForm__form__inputContainer__error">
              {errors.isExcursionPublic.message}
            </div>
          )}
        </div>
        {watch('isExcursionPublic') && (
          <>
            <div>U koliko sati eksurzija kreće</div>
            <fieldset className="newExcursionForm__form__multipleCheckboxes">
              {hours.map((hour) => {
                return (
                  <div
                    className="newExcursionForm__form__multipleCheckboxes__hours"
                    key={hour}
                  >
                    <label htmlFor={hour.toString()}>{`${hour}:00`}</label>
                    <input
                      type="checkbox"
                      id={hour.toString()}
                      value={hour}
                      {...register(`hours`)}
                    />
                  </div>
                );
              })}
              {watch('hours')?.length === 0 && (
                <div className="newExcursionForm__form__inputContainer__error">
                  Odaberite barem jedno početno vrijeme
                </div>
              )}
            </fieldset>
          </>
        )}
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="photos">Fotografije</label>
          <input
            multiple
            id="photos"
            type="file"
            accept="image/*"
            disabled={excursionStatus.isAdding}
            onChange={handleCompressedUpload}
          />
        </div>
        <div className="newExcursionForm__form__images">
          {compressedFiles.map((image, index) => {
            return (
              <div
                key={index}
                className="newExcursionForm__form__images__image"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={'photo' + index}
                  width={100}
                  height={80}
                  placeholder={'blur'}
                  blurDataURL={URL.createObjectURL(image)}
                />
                <button
                  type="button"
                  className="newExcursionForm__form__images__image__button"
                  disabled={excursionStatus.isAdding}
                  onClick={() => {
                    setCompressedFiles(
                      compressedFiles.filter((file) => file !== image),
                    );
                  }}
                >
                  Ukloni
                </button>
                <button
                  type="button"
                  className="newExcursionForm__form__images__image__button"
                  disabled={
                    excursionStatus.isAdding || watch('titleImage') === index
                  }
                  onClick={() => setValue('titleImage', index)}
                >
                  Naslovna
                </button>
              </div>
            );
          })}
          {excursion?.images?.map((imageUrl) => {
            return (
              <div
                key={imageUrl}
                className="newExcursionForm__form__images__image"
              >
                <Image
                  src={imageUrl}
                  alt={'photo' + imageUrl}
                  width={120}
                  height={100}
                  placeholder={'blur'}
                  blurDataURL={imageUrl}
                />
                <div className="newExcursionForm__form__images__image__buttons">
                  <button
                    type="button"
                    className="newExcursionForm__form__images__image__buttons__button"
                    disabled={handleIsImageRemoveDisabled()}
                    onClick={() => deleteImageFromStorage(imageUrl)}
                  >
                    Ukloni
                  </button>
                  <button
                    type="button"
                    className="newExcursionForm__form__images__image__buttons__button"
                    disabled={
                      excursionStatus.isAdding ||
                      watch('titleImage') === imageUrl
                    }
                    onClick={() => setValue('titleImage', imageUrl)}
                  >
                    Naslovna
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="newExcursionForm__form__submit"
          type="submit"
          disabled={excursionStatus.isAdding}
        >
          {excursionStatus.isAdding ? (
            <ClipLoader
              loading={excursionStatus.isAdding}
              color={'white'}
              size={30}
            />
          ) : excursion?.titleHr ? (
            'Spremi promjene'
          ) : (
            'Dodaj eskurziju'
          )}
        </button>
        {excursionStatus.isFileListEmpty && (
          <div>Molimo dodajte barem jednu fotografiju</div>
        )}
        {excursionStatus.isAdded && (
          <div>
            {excursion?.id
              ? 'Promjene su uspješno spremeljene'
              : 'Eskurzija je uspješno dodana'}
          </div>
        )}
        {excursionStatus.error && <div>Nešto je pošlo po krivu</div>}
      </form>
    </div>
  );
};

export default ExcursionForm;
