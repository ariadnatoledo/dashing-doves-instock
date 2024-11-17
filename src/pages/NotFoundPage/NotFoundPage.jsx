import ComponentHeader from "../../components/ComponentHeader/ComponentHeader";
import backIconImage from "../../assets/Icons/arrowback.svg";

const NotFoundPage = () => {
  return (
    <ComponentHeader
      backIcon={backIconImage}
      navigateTo="/"
      text="Oops! Page Not Found"
    />
  );
};

export default NotFoundPage;
