import { useEffect, useState } from "react";
import Titles from "../../Ui/Titles";
import InputField from "../../Ui/InputField";
import ButtonDone from "../../Ui/ButtonDone";
import InputArrow from "../../Ui/InputArrow";
import FileUploadBase64 from "../../Ui/FileUploadBase64";
import usePost from "../../Hooks/usePost";
import usePut from "../../Hooks/usePut";
import useGet from "../../Hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";
import SwitchButton from "../../Ui/SwitchButton";
import { useTranslation } from "react-i18next";

interface Payment {
  name: string;
  description: string;
  type: string;
  image: string;
  isActive: boolean;
}

const AddPayment: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const paymentId = location.state || null;
  const { data: paymentData, get } = useGet<Payment>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Payment>({
    name: "",
    description: "",
    type: "",
    image: "",
    isActive: true,
  });

  const [imageUpdated, setImageUpdated] = useState(false);

  const isEdit = !!paymentId;

  const typeOptions = [
    { id: "Auto", name: t("Auto") },
    { id: "Manual", name: t("Manual") },
  ];

  useEffect(() => {
    if (isEdit && paymentId) {
      get(`https://bcknd.sportego.org/api/payment-methods/${paymentId}`);
    }
  }, [paymentId]);

  useEffect(() => {
    if (paymentData) {
      setFormData({
        name: paymentData.name || "",
        description: paymentData.description || "",
        type: paymentData.type || "",
        image: paymentData.image || "",
        isActive: paymentData.isActive ?? true,
      });
      setImageUpdated(false);
    }
  }, [paymentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) return toast.error(t("PleaseEnterPaymentName"));
    if (!formData.description?.trim())
      return toast.error(t("PleaseEnterDescription"));
    if (!formData.type?.trim()) return toast.error(t("PleaseSelectType"));
    if (!isEdit && !formData.image?.trim())
      return toast.error(t("PleaseUploadImage"));

    const url = `https://bcknd.sportego.org/api/payment-methods${
      isEdit ? `/${paymentId}` : ""
    }`;

    const action = isEdit ? put : post;

    const payload = { ...formData } as Payment;

    if (isEdit && !imageUpdated) {
      delete payload.image;
    }

    const res = await action(url, payload);

    if (res.success !== false) {
      toast.success(
        t(isEdit ? "PaymentUpdatedSuccessfully" : "PaymentAddedSuccessfully")
      );
      nav("/admin/payment");
    } else {
      toast.error(t(isEdit ? "FailedToUpdatePayment" : "FailedToAddPayment"));
    }
  };

  if (isEdit && !paymentData && !postLoading && !putLoading)
    return (
      <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? t("EditPayment") : t("AddPayment")} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder={t("PaymentName")}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          placeholder={t("Description")}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <InputArrow
          placeholder={t("Type")}
          name="type"
          value={formData.type}
          options={typeOptions}
          onChange={handleTypeChange}
        />

        <div className="flex items-center justify-between mt-4">
          <SwitchButton
            checked={formData.isActive}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, isActive: val }))
            }
            onLabel={t("Active")}
            offLabel={t("Inactive")}
          />
        </div>

        <FileUploadBase64
          label={t("ChooseImage")}
          onChange={(base64) => {
            setFormData((prev) => ({ ...prev, image: base64 }));
            setImageUpdated(true);
          }}
        />

        {formData.image && (
          <img
            src={formData.image}
            alt={t("PaymentPreview")}
            className="object-cover w-32 h-32 border rounded-lg"
          />
        )}

        <ButtonDone
          checkLoading={postLoading || putLoading}
          handleSave={handleSave}
          edit={isEdit}
        />
      </div>
    </div>
  );
};

export default AddPayment;
