'use client';
import React, { ChangeEvent, useState } from 'react';
import Compressor from 'compressorjs';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { excursionSchema } from '@/zod/excursionSchema';
import * as z from 'zod';
import addExcursionServer from '@/app/api/database/addExcursionServer';
import { ClipLoader } from 'react-spinners';

type NewExcursionData = z.infer<typeof excursionSchema>;
const ExcursionForm = () => {
  const [compressedFiles, setCompressedFiles] = useState<Array<File>>([]);
  const [percentage, setPercentage] = useState(0);
  const [excursionStatus, setExcursionStatus] = useState({
    isAdding: false,
    error: false,
    isAdded: false,
    isFileListEmpty: false,
  });
  const {
    reset,
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<NewExcursionData>({
    resolver: zodResolver(excursionSchema),
    defaultValues: {
      descEng: '',
      title: '',
      duration: 1,
      descCro: '',
    },
  });
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
    if (compressedFiles.length === 0) {
      setExcursionStatus({ ...excursionStatus, isFileListEmpty: true });
      return;
    }
    const formData = new FormData();
    const imagesFormData = new FormData();
    setExcursionStatus({
      isAdding: true,
      error: false,
      isAdded: false,
      isFileListEmpty: false,
    });
    // Add data to FormData
    formData.append('title', getValues('title'));
    appendFilesToFormData(imagesFormData, compressedFiles, 'images');
    formData.append('duration', getValues('duration').toString());
    formData.append('descCro', getValues('descCro'));
    formData.append('descEng', getValues('descEng'));

    console.log('tz');
    const status = await addExcursionServer(formData, imagesFormData);
    if (status) {
      reset();
      setCompressedFiles([]);
      setExcursionStatus({
        ...excursionStatus,
        isAdding: false,
        isAdded: true,
      });
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
  const handleCompressedUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const images = filterImageFiles(e.currentTarget.files);

    if (images) {
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
            <label htmlFor="title">Naziv eskurzije</label>
            <input type="text" id="title" {...register('title')} />
            {errors.title && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.title.message}
              </div>
            )}
          </div>
          <div className="newExcursionForm__form__inputContainer">
            <label htmlFor="duration">Trajanje u satima</label>
            <input
              type="number"
              id="duration"
              defaultValue={1}
              min={1}
              {...register('duration')}
            />
            {errors.duration && (
              <div className="newExcursionForm__form__inputContainer__error">
                {errors.duration.message}
              </div>
            )}
          </div>
        </div>
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="descHr">Opis eskurzije na hrvatskom</label>
          <textarea id="descHr" {...register('descCro')} rows={10} />
          {errors.descCro && (
            <div className="newExcursionForm__form__inputContainer__error">
              {errors.descCro.message}
            </div>
          )}
        </div>
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="descEn">Opis eskurzije na engleskom</label>
          <textarea id="descEn" {...register('descEng')} rows={10} />
          {errors.descEng && (
            <div className="newExcursionForm__form__inputContainer__error">
              {errors.descEng.message}
            </div>
          )}
        </div>
        <div className="newExcursionForm__form__inputContainer">
          <label htmlFor="photos">Fotografije</label>
          <input
            multiple
            id="photos"
            type="file"
            accept="image/*"
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
                />
                <button
                  type="button"
                  className="newExcursionForm__form__images__image__button"
                  onClick={(e) => {
                    setCompressedFiles(
                      compressedFiles.filter((file) => file !== image),
                    );
                  }}
                >
                  Ukloni
                </button>
              </div>
            );
          })}
        </div>

        {percentage !== 0 && <div>{percentage}</div>}

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
          ) : (
            'Dodaj eskurziju'
          )}
        </button>
        {excursionStatus.isFileListEmpty && (
          <div>Molimo dodajte barem jednu fotografiju</div>
        )}
        {excursionStatus.isAdded && <div>Eskurzija je uspješno dodana</div>}
        {excursionStatus.error && <div>Nešto je pošlo po krivu</div>}
      </form>
    </div>
  );
};

export default ExcursionForm;
