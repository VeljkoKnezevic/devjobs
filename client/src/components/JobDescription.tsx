import DOMPurify from "dompurify";

type TJobDescription = {
  description: string;
};
const JobDescription = ({ description }: TJobDescription) => {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div
      className="mt-8 text-base font-normal text-dark-gray md:mt-10"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default JobDescription;
