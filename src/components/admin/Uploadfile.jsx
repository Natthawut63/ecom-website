import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/Product";
import useEconStore from "../../store/ecom-store";

import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEconStore((state) => state.token);

  const handleChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image file`);
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
                toast.success(`File ${file.name} uploaded successfully`);
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
        toast.success(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-4">
      <div className="flex mx-auto gap-4 my-4">
        {
          //true work back &&
          isLoading && <Loader className="animate-spin w-16 h-16" />
        }
        {/* Image */}
        {form.images?.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.url} alt="" />
            {/* ()=> call function , no runtime */}
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-md"
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div>
        <input onChange={handleChange} type="file" name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
