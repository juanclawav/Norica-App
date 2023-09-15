interface Props {
  urlImg: string;
  styles: string;
  imageTitle: string;
}

export const EditableImage = ({ urlImg, styles, imageTitle }: Props) => {
  return (
    <figure className={styles}>
      <img src={urlImg} className={styles} alt={imageTitle} />
    </figure>
  );
};
