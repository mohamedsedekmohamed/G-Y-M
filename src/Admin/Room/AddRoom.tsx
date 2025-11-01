import { useEffect, useState } from "react";
import Titles from "../../Ui/Titles";
import InputField from "../../Ui/InputField";
import ButtonDone from "../../Ui/ButtonDone";
import FileUploadBase64 from "../../Ui/FileUploadBase64";
import FileUploadButtonArroy from "../../Ui/FileUploadButtonArroy"; // لرفع أكثر من صورة
import usePost from "../../Hooks/usePost";
import usePut from "../../Hooks/usePut";
import useGet from "../../Hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";
import { useTranslation } from "react-i18next";

interface Room {
  name: string;
  thumbnail?: string;
  capacity: number|number;
  description: string;
  galleryImages?: string[];
  gallery?: { image: string }[];
}

const AddRoom: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const roomId = location.state || null;
  const { data: roomData, get } = useGet<Room>();
  const { post, loading: postLoading } = usePost();
  const { put, loading: putLoading } = usePut();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Room>({
    name: "",
    thumbnail: "",
    capacity: 0,
    description: "",
    galleryImages: [],
  });

  const [thumbnailUpdated, setThumbnailUpdated] = useState(false);
  const [galleryUpdated, setGalleryUpdated] = useState(false);

  const isEdit = !!roomId;

  useEffect(() => {
    if (isEdit && roomId) {
      get(`https://bcknd.sportego.org/api/rooms/${roomId}`);
    }
  }, [roomId]);

 useEffect(() => {
  if (roomData) {
    setFormData({
      name: roomData.name || "",
      capacity: roomData.capacity || 0,
      description: roomData.description || "",
      thumbnail: roomData.thumbnail || "",
      galleryImages: roomData.gallery?.map((g: any) => g.image) || [],
    });
    setThumbnailUpdated(false);
    setGalleryUpdated(false);
  }
}, [roomData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return toast.error(t("PleaseEnterRoomName"));
    if (!formData.description.trim())
      return toast.error(t("PleaseEnterDescription"));
    if (!formData.capacity || formData.capacity <= 0)
      return toast.error(t("PleaseEnterValidCapacity"));
    if (!isEdit && !formData.thumbnail)
      return toast.error(t("PleaseUploadThumbnail"));
    if (!isEdit && (!formData.galleryImages || formData.galleryImages.length === 0))
      return toast.error(t("PleaseUploadGalleryImages"));

    const url = `https://bcknd.sportego.org/api/rooms${
      isEdit ? `/${roomId}` : ""
    }`;

    const action = isEdit ? put : post;

    const payload = { ...formData } as Room;

    if (isEdit && !thumbnailUpdated) delete payload.thumbnail;
    if (isEdit && !galleryUpdated) delete payload.galleryImages;

    const res = await action(url, payload);

    if (res.success !== false) {
      toast.success(
        t(isEdit ? "RoomUpdatedSuccessfully" : "RoomAddedSuccessfully")
      );
      nav("/admin/room");
    } else {
      toast.error(t(isEdit ? "FailedToUpdateRoom" : "FailedToAddRoom"));
    }
  };

  if (isEdit && !roomData && !postLoading && !putLoading)
    return (
      <div className="flex items-center justify-center max-h-screen max-w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Titles title={isEdit ? t("EditRoom") : t("AddRoom")} />

      <div className="flex flex-col max-w-lg gap-4">
        <InputField
          placeholder={t("RoomName")}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          placeholder={t("Capacity")}
          name="capacity"
          type="number"
  value={formData.capacity.toString()}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder={t("Description")}
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md outline-none resize-none h-28 focus:ring-2 focus:ring-maincolor"
        />

        <FileUploadBase64
          label={t("ChooseThumbnail")}
          onChange={(base64) => {
            setFormData((prev) => ({ ...prev, thumbnail: base64 }));
            setThumbnailUpdated(true);
          }}
        />

        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt={t("RoomPreview")}
            className="object-cover w-32 h-32 border rounded-lg"
          />
        )}

    <FileUploadButtonArroy
  label={t("ChooseGalleryImages")}
  defaultImages={formData.galleryImages} 
  onChange={(base64Array) => {
    setFormData((prev) => ({ ...prev, galleryImages: base64Array }));
    setGalleryUpdated(true);
  }}
/>


   

        <ButtonDone
          checkLoading={postLoading || putLoading}
          handleSave={handleSave}
          edit={isEdit}
        />
      </div>
    </div>
  );
};

export default AddRoom;
