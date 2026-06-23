import {
  Document24Regular,
  Dismiss16Regular,
  Warning24Regular,
  DocumentAdd24Regular,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import styles from './FileUpload.module.scss';

import type { FileUploadProps } from './FileUpload.type';

/**
 * Trunca o nome do arquivo para no máximo 2 linhas (~18 caracteres no thumb de 75px).
 * Quando truncado, preserva a extensão: "nometruncado... .pdf"
 */
function truncateFileName(fileName: string, maxChars = 18): string {
  if (fileName.length <= maxChars) return fileName;
  const lastDot = fileName.lastIndexOf('.');
  const hasExtension = lastDot > 0 && lastDot < fileName.length - 1;
  const baseName = hasExtension ? fileName.substring(0, lastDot) : fileName;
  const extension = hasExtension ? fileName.substring(lastDot) : '';
  const reserved = 3 + extension.length; // "..."
  const available = maxChars - reserved;
  if (available <= 1) {
    return fileName.substring(0, maxChars - 3) + '...';
  }
  return baseName.substring(0, available) + '...' + extension;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      value,
      onChange,
      helperText,
      error = false,
      errorMessage,
      maxFileSize,
      maxFilesQuantity,
      disabled = false,
      className,
      id,
      accept,
      multiple = true,
      description = 'Clique ou arraste os arquivos aqui',
      descriptionErrorMessage,
      maxSizeErrorMessage = 'Um ou mais arquivos excedem o tamanho máximo permitido.',
      maxFilesErrorMessage = 'Número máximo de arquivos atingido.',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const componentId = id || generatedId;
    const helperId = `${componentId}-helper`;
    const listId = `${componentId}-list`;

    const inputRef = useRef<HTMLInputElement>(null);
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [objectUrls, setObjectUrls] = useState<Map<string, string>>(new Map());
    const [sizeError, setSizeError] = useState<string | null>(null);
    const [filesError, setFilesError] = useState<string | null>(null);

    const isControlled = value !== undefined;
    const files = isControlled ? value : internalFiles;

    useEffect(() => {
      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [objectUrls]);

    const getObjectUrl = useCallback(
      (file: File): string => {
        const key = `${file.name}-${file.size}`;
        const existing = objectUrls.get(key);
        if (existing) return existing;
        const url = URL.createObjectURL(file);
        setObjectUrls((prev) => new Map(prev).set(key, url));
        return url;
      },
      [objectUrls]
    );

    const revokeUrl = useCallback((file: File) => {
      const key = `${file.name}-${file.size}`;
      setObjectUrls((prev) => {
        const next = new Map(prev);
        const url = next.get(key);
        if (url) URL.revokeObjectURL(url);
        next.delete(key);
        return next;
      });
    }, []);

    const processFiles = useCallback(
      (incoming: FileList | File[]) => {
        if (disabled) return;

        const all = Array.from(incoming);
        const newFiles = all.filter((file) => {
          if (maxFileSize && file.size > maxFileSize) return false;
          return true;
        });

        if (all.length !== newFiles.length) {
          setSizeError(maxSizeErrorMessage);
        } else {
          setSizeError(null);
        }

        const merged = multiple
          ? [...files, ...newFiles]
          : newFiles.slice(0, 1);

        const limited =
          maxFilesQuantity && multiple ? merged.slice(0, maxFilesQuantity) : merged;

        if (maxFilesQuantity && multiple && merged.length > maxFilesQuantity) {
          setFilesError(maxFilesErrorMessage);
        } else {
          setFilesError(null);
        }

        if (!isControlled) setInternalFiles(limited);
        onChange?.(limited);
      },
      [disabled, files, isControlled, maxFilesQuantity, maxFilesErrorMessage, maxFileSize, maxSizeErrorMessage, multiple, onChange]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          processFiles(e.target.files);
          e.target.value = '';
        }
      },
      [processFiles]
    );

    const handleClick = useCallback(() => {
      if (!disabled) inputRef.current?.click();
    }, [disabled]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      [disabled]
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      },
      [disabled]
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
      },
      []
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (!disabled && e.dataTransfer.files.length > 0) {
          processFiles(e.dataTransfer.files);
        }
      },
      [disabled, processFiles]
    );

    const handleRemove = useCallback(
      (e: React.MouseEvent | React.KeyboardEvent, index: number) => {
        e.stopPropagation();
        const removed = files[index];
        revokeUrl(removed);
        const updated = files.filter((_, i) => i !== index);
        if (!isControlled) setInternalFiles(updated);
        onChange?.(updated);
      },
      [files, isControlled, onChange, revokeUrl]
    );

    const hasFiles = files.length > 0;
    const isError = error || !!errorMessage || !!sizeError || !!filesError;
    const displayedHelper = isError ? errorMessage || sizeError || filesError || helperText : helperText;

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    return (
      <div
        id={componentId}
        className={clsx(styles.container, className)}
      >
        <input
          ref={setRefs}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
          style={{ display: 'none' }}
          onChange={handleInputChange}
          {...rest}
        />

        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={description}
          aria-disabled={disabled}
          aria-describedby={displayedHelper ? helperId : undefined}
          aria-controls={hasFiles ? listId : undefined}
          data-invalid={isError || undefined}
          className={clsx(
            styles.dropZone,
            isDragging && styles.dragging,
            isError && styles.alert,
            disabled && styles.disabled
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!hasFiles && !isError && (
            <div className={styles.emptyState} aria-hidden="true">
              <span className={styles.uploadIcon}>
                <DocumentAdd24Regular />
              </span>
              <span className={styles.uploadText}>{description}</span>
            </div>
          )}

          {!hasFiles && isError && (
            <div className={styles.emptyState} aria-hidden="true">
              <span className={styles.alertIcon}>
                <Warning24Regular />
              </span>
              {descriptionErrorMessage && (
                <span className={styles.alertText}>{descriptionErrorMessage}</span>
              )}
            </div>
          )}

          {hasFiles && (
            <ul
              id={listId}
              className={styles.fileList}
              aria-label={`${files.length} arquivo${files.length !== 1 ? 's' : ''} selecionado${files.length !== 1 ? 's' : ''}`}
              aria-live="polite"
            >
              {files.map((file, index) => {
                const isImage = file.type.startsWith('image/');
                return (
                  <li key={`${file.name}-${index}`} className={styles.thumb}>
                    <div className={styles.thumbClip}>
                      {isImage ? (
                        <img
                          src={getObjectUrl(file)}
                          alt={file.name}
                          title={file.name}
                          className={styles.thumbImage}
                        />
                      ) : (
                        <div className={styles.thumbFile} aria-hidden="true" title={file.name}>
                          <Document24Regular />
                          <span className={styles.thumbFileName}>{truncateFileName(file.name)}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label={`Remover ${file.name}`}
                      disabled={disabled}
                      onClick={(e) => handleRemove(e, index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRemove(e, index);
                        }
                      }}
                    >
                      <Dismiss16Regular aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {displayedHelper && (
          <span
            id={helperId}
            role={isError ? 'alert' : undefined}
            className={clsx(
              styles.helperText,
              isError && styles.errorText
            )}
          >
            {displayedHelper}
          </span>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
