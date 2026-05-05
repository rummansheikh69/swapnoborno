"use client";
import { useState } from "react";
import axios from "axios";

export default function VerifyProfileSecondModal() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  // ---------- Helpers ----------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const countFilled = (fields) => fields.filter((f) => form[f]).length;

  // ---------- Section Calculations ----------

  const personalPhoneFilled = countFilled([
    "phoneNumberOne",
    "phoneNumberTwo",
    "phoneNumberThree",
  ]);

  const bankingFilled = countFilled([
    "bkashNumber",
    "nagadNumber",
    "rocketNumber",
  ]);

  const familyFilled = countFilled([
    "motherNumber",
    "fatherNumber",
    "brothersNumber",
    "sistersNumber",
    "unclesNumber",
    "brothersInLawNumber",
    "motherInLawNumber",
  ]);

  const friendFilled = countFilled([
    "cousinsNumber",
    "mamatovaisNumber",
    "fufatovaisNumber",
    "closefriendsNumber",
    "otherFriendsNumber",
  ]);

  const emergencyFilled = countFilled([
    "neighboursNumber",
    "elakarBoroVairNumber",
    "electedMembersNumber",
    "electedChairmansNumber",
    "otherImportantNumber",
  ]);

  const ownNidFilled = countFilled(["ownNidFrontImage", "ownNidBackImage"]);

  const familyNidFilled = countFilled([
    "familyNidFrontImage",
    "familyNidBackImage",
  ]);

  const selfImageFilled = countFilled(["ownHalfBodyImage", "ownFullBodyImage"]);

  // ---------- Validation ----------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (personalPhoneFilled < 1) {
      newErrors.personalPhone = true;
      scrollToSection("personal_phone");
    }

    if (bankingFilled < 1) {
      newErrors.banking = true;
      scrollToSection("banking");
    }

    if (familyFilled < 3) {
      newErrors.family = true;
      scrollToSection("family");
    }

    if (friendFilled < 2) {
      newErrors.friend = true;
      scrollToSection("friend");
    }

    if (emergencyFilled < 2) {
      newErrors.emergency = true;
      scrollToSection("emergency");
    }

    if (ownNidFilled < 2) {
      newErrors.ownNid = true;
      scrollToSection("own_nid");
    }

    if (familyNidFilled < 2) {
      newErrors.familyNid = true;
      scrollToSection("family_nid");
    }

    if (selfImageFilled < 2) {
      newErrors.selfImage = true;
      scrollToSection("self_image");
    }

    if (!form.electricityBill) {
      newErrors.electricity = true;
      scrollToSection("electricity");
    }

    if (!form.admitCardImage) {
      newErrors.admit = true;
      scrollToSection("admit");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ---------- API CALL ----------

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post("/api/verification", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Verification submitted!");
    } catch (err) {
      alert("Submission failed");
    }
  };

  const sectionTitle = (id, title, filled, required) => (
    <div
      id={id}
      className={`col-span-2 p-2 rounded-lg transition-all ${
        errors[id] ? "animate-pulse bg-red-100" : ""
      }`}
    >
      <h1
        className={`text-2xl font-semibold ${
          filled >= required ? "text-green-600" : "text-zinc-700"
        }`}
      >
        {title} ({filled}/{required})
      </h1>
    </div>
  );

  return (
    <dialog id="verify_2" className="modal">
      <div className="modal-box max-w-3xl h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* PERSONAL PHONE */}
          {sectionTitle(
            "personal_phone",
            "আপনার ব্যাবহৃত ফোন নাম্বার",
            personalPhoneFilled,
            1,
          )}

          <input
            name="phoneNumberOne"
            onChange={handleChange}
            className="input"
            placeholder="নিজ ১"
          />
          <input
            name="phoneNumberTwo"
            onChange={handleChange}
            className="input"
            placeholder="নিজ ২"
          />
          <input
            name="phoneNumberThree"
            onChange={handleChange}
            className="input"
            placeholder="নিজ ৩"
          />

          {/* BANKING */}
          {sectionTitle("banking", "মোবাইল ব্যাংকিং নাম্বার", bankingFilled, 1)}

          <input
            name="bkashNumber"
            onChange={handleChange}
            className="input"
            placeholder="Bkash"
          />
          <input
            name="nagadNumber"
            onChange={handleChange}
            className="input"
            placeholder="Nagad"
          />
          <input
            name="rocketNumber"
            onChange={handleChange}
            className="input"
            placeholder="Rocket"
          />

          {/* FAMILY */}
          {sectionTitle("family", "পরিবারের নাম্বার", familyFilled, 3)}

          <input
            name="motherNumber"
            onChange={handleChange}
            className="input"
            placeholder="মা"
          />
          <input
            name="fatherNumber"
            onChange={handleChange}
            className="input"
            placeholder="বাবা"
          />
          <input
            name="brothersNumber"
            onChange={handleChange}
            className="input"
            placeholder="ভাই"
          />
          <input
            name="sistersNumber"
            onChange={handleChange}
            className="input"
            placeholder="বোন"
          />
          <input
            name="unclesNumber"
            onChange={handleChange}
            className="input"
            placeholder="চাচা"
          />
          <input
            name="brothersInLawNumber"
            onChange={handleChange}
            className="input"
            placeholder="দুলাভাই"
          />
          <input
            name="motherInLawNumber"
            onChange={handleChange}
            className="input"
            placeholder="শ্বশুর/শাশুড়ি"
          />

          {/* FRIEND */}
          {sectionTitle("friend", "ফ্রেন্ড সার্কেল", friendFilled, 2)}

          <input
            name="cousinsNumber"
            onChange={handleChange}
            className="input"
            placeholder="চাচাত ভাই"
          />
          <input
            name="mamatovaisNumber"
            onChange={handleChange}
            className="input"
            placeholder="মামাত ভাই"
          />
          <input
            name="fufatovaisNumber"
            onChange={handleChange}
            className="input"
            placeholder="ফুপাত ভাই"
          />
          <input
            name="closefriendsNumber"
            onChange={handleChange}
            className="input"
            placeholder="ক্লোজ বন্ধু"
          />
          <input
            name="otherFriendsNumber"
            onChange={handleChange}
            className="input"
            placeholder="Other"
          />

          {/* EMERGENCY */}
          {sectionTitle("emergency", "জরুরি নাম্বার", emergencyFilled, 2)}

          <input
            name="neighboursNumber"
            onChange={handleChange}
            className="input"
            placeholder="প্রতিবেশী"
          />
          <input
            name="elakarBoroVairNumber"
            onChange={handleChange}
            className="input"
            placeholder="এলাকার বড় ভাই"
          />
          <input
            name="electedMembersNumber"
            onChange={handleChange}
            className="input"
            placeholder="মেম্বার"
          />
          <input
            name="electedChairmansNumber"
            onChange={handleChange}
            className="input"
            placeholder="চেয়ারম্যান"
          />
          <input
            name="otherImportantNumber"
            onChange={handleChange}
            className="input"
            placeholder="Other"
          />

          {/* ELECTRICITY */}
          {sectionTitle(
            "electricity",
            "বিদ্যুৎ বিল",
            form.electricityBill ? 1 : 0,
            1,
          )}

          <input
            type="file"
            name="electricityBill"
            onChange={handleFile}
            className="file-input col-span-2"
          />

          {/* OWN NID */}
          {sectionTitle("own_nid", "নিজ NID", ownNidFilled, 2)}

          <input
            type="file"
            name="ownNidFrontImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />
          <input
            type="file"
            name="ownNidBackImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />

          {/* FAMILY NID */}
          {sectionTitle("family_nid", "বাবা/মায়ের NID", familyNidFilled, 2)}

          <input
            type="file"
            name="familyNidFrontImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />
          <input
            type="file"
            name="familyNidBackImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />

          {/* ADMIT */}
          {sectionTitle(
            "admit",
            "স্কুল সার্টিফিকেট",
            form.admitCardImage ? 1 : 0,
            1,
          )}

          <input
            type="file"
            name="admitCardImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />

          {/* SELF IMAGE */}
          {sectionTitle("self_image", "নিজের ছবি", selfImageFilled, 2)}

          <input
            type="file"
            name="ownHalfBodyImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />
          <input
            type="file"
            name="ownFullBodyImage"
            onChange={handleFile}
            className="file-input col-span-2"
          />

          <div className="col-span-2 flex justify-end mt-6">
            <button type="submit" className="btn btn-success">
              Submit Verification
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
