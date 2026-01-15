import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../shop/api/Product";
import useEconStore from "../../../app/store/ecom-store";

import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEconStore((state) => state.token);

  const handleChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      let allFiles = form.images || []; // [] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image file`, {
            autoClose: 1000,
          });
          continue;
        }
        //image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            //endpoint backend
            uploadFiles(token, data)
              .then((res) => {
                console.log(res.data);
                allFiles.push(res.data); //push to array
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success(`File ${file.name} uploaded successfully`, {
                  autoClose: 1000,
                });
              })
              .catch((err) => {
                setIsLoading(true);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        console.log(res.data);
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        setForm({
          ...form,
          images: filterImages,
        });
        toast.success(res.data, { autoClose: 1000 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-4 px-4 pb-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {
          //true work back &&
          isLoading && (
            <Loader className="animate-spin w-12 h-12 text-blue-500" />
          )
        }
        {/* Image */}
        {form.images?.map((item, index) => (
          <div className="relative w-24 h-24" key={index}>
            <img
              className="w-full h-full object-cover rounded-md border-2 border-gray-300 shadow-lg hover:scale-105 transition-transform"
              src={item.url}
              alt={`Uploaded file ${index + 1}`}
            />
            {/* ()=> call function , no runtime */}
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-700"
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <label
          htmlFor="file-upload"
          className="block text-blue-500 font-semibold cursor-pointer hover:text-blue-700"
        >
          <span className="text-lg">Click to upload images</span>
        </label>
        <input
          id="file-upload"
          onChange={handleChange}
          type="file"
          name="images"
          multiple
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Uploadfile;
