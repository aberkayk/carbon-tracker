import { useTranslation } from "react-i18next";
import { SignUpForm } from "../../components/auth";
import { Button } from "../../components/ui";
import authImage from "../../assets/images/auth-image.png";

export default function SignUpPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans">
      {/* Left Content */}
      <div className="flex flex-col lg:flex-1 bg-darkblue-100 p-8 lg:p-16 relative overflow-hidden">
        {/* Back Button */}
        <div className="z-10">
          <Button variant="outline" size="sm" className="rounded-[8px]">
            {t("auth.back")}
          </Button>
        </div>

        {/* Illustration and Text */}
        <div className="flex flex-col items-start lg:items-end justify-center z-10 ">
          <div className="flex flex-col items-center gap-2">
            <img
              src={authImage}
              alt="Stay Connected"
              className="object-contain max-w-[512px] max-h-[562px] aspect-512/562 hidden lg:flex"
            />

            <h2 className="text-[40px] lg:text-[70px] font-bold text-white-100 leading-[1.1] max-w-64 md:max-w-[400px] mt-4 lg:mt-0">
              {t("auth.stayConnected")}
            </h2>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-[1.2] bg-white-100 md:bg-transparent flex items-center justify-center lg:justify-start relative py-12">
        <div className="w-full max-w-[480px] z-10 flex justify-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
