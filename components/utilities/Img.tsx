/* eslint-disable @next/next/no-img-element */
export const Img = ({ src, alt, className }) => {
  return (
    <>
      {/* This is a test comment */}
      <div className={className ? `image--outer ${className}` : 'image--outer'}>
        <div className="image--inner">
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};
/* eslint-enable @next/next/no-img-element */