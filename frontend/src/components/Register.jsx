import React, { useState } from "react";
import Input from "./InputWrapper";
import Button from "./ButtonWrapper";
import { useRef } from "react";
import { FetchData } from "../utils/fetchFromApi.js";

export const Register = () => {
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    const maxSize = 1 * 1024 * 1024;

    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, PNG, GIF, WebP, SVG).");
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 1MB.");
      e.target.value = "";
      return;
    }
    setImages(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleImageCancel = () => {
    setImages(null);
    setImagePreview(null);
    document.getElementById("imageInput").value = "";
  };

  const handleRegister = async (e) => {
    // setLoading(true);

    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(formRef.current);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await FetchData(
        `users/register-user`,
        "post",
        formData,
        true
      );
      console.log(response);
      setSuccess("Product added successfully!");
      alert("You are registered successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to register.");
    }
  };

  return (
    <div>
      {/* <h1>Register</h1> */}
      <div className="h-screen w-full flex justify-center items-center">
        <form
          ref={formRef}
          onSubmit={handleRegister}
          className="w-fit flex flex-col justify-center items-center gap-3.5 shadow-2xl shadow-[#FD632D] p-10 rounded-xl "
        >
          <Input label={"Name"} name="name" placeholder="Name" />
          <Input
            label={"Phone"}
            name="phoneNumber"
            type="number"
            placeholder="Contact number"
          />
          <Input
            label={"Email"}
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            label={"Password"}
            name="password"
            type="password"
            placeholder="Password"
          />
          <div className="flex justify-center items-end gap-5">
            <Input
              label={"Upload Profile Picture"}
              name={`image`}
              type="file"
              onChange={(e) => {
                handleImageFileChange(e);
              }}
            />
            {imagePreview && (
              <div className="flex items-center justify-center  gap-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md border"
                />

                {/* Cancel Button */}
                <button
                  onClick={handleImageCancel}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <Button label={"Register"} variant="primary" type="submit" />
        </form>
      </div>
    </div>
  );
};
