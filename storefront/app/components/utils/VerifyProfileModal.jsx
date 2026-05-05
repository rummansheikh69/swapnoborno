"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { useState } from "react";

function VerifyProfileModal() {
  const [accepted, setAccepted] = useState(false);
  const { isCreatingVerification, createVerification } = useUserStore();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        [name]: reader.result, // MUST be base64 string
      }));
    };

    reader.readAsDataURL(file);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const countFilled = (fields) => {
    return fields.filter((f) => form[f]).length;
  };

  const personalInfoFilled = countFilled([
    "userName",
    "fatherName",
    "motherName",
    "userOccupation",
    "fatherOccupation",
    "motherOccupation",
  ]);

  const addressFilled = countFilled([
    "village",
    "postOffice",
    "thana",
    "district",
  ]);

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

  const schoolAddressFilled = countFilled(["schoolAddress"]);
  const collegeAddressFilled = countFilled(["collegeAddress"]);
  const whatsappFilled = countFilled(["whatsAppNumber"]);
  const ownFacebookFilled = countFilled(["ownFacebookProfile"]);
  const familyFacebookFilled = countFilled(["familyFacebookProfile"]);

  const familyNidFilled = countFilled([
    "familyNidFrontImage",
    "familyNidBackImage",
  ]);

  const admitCardImageFilled = countFilled(["admitCardImage"]);
  const fullBodyImageFilled = countFilled([
    "ownHalfBodyImage",
    "ownFullBodyImage",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (personalInfoFilled < 6) {
      newErrors.personalInfo = true;
      scrollToSection("personal_info");
    }

    if (bankingFilled < 1) {
      newErrors.banking = true;
      scrollToSection("banking");
    }

    if (familyFilled < 2) {
      newErrors.family = true;
      scrollToSection("family");
    }

    if (schoolAddressFilled < 1) {
      newErrors.schoolAddress = true;
      scrollToSection("school_address");
    }

    if (collegeAddressFilled < 1) {
      newErrors.collegeAddress = true;
      scrollToSection("college_address");
    }

    if (whatsappFilled < 1) {
      newErrors.whatsapp = true;
      scrollToSection("whatsapp");
    }

    if (ownFacebookFilled < 1) {
      newErrors.ownFacebook = true;
      scrollToSection("ownFacebook");
    }

    if (familyFacebookFilled < 1) {
      newErrors.familyFacebook = true;
      scrollToSection("family_facebook");
    }

    if (familyNidFilled < 2) {
      newErrors.familyNid = true;
      scrollToSection("family_nid");
    }
    if (admitCardImageFilled < 1) {
      newErrors.admitCardImage = true;
      scrollToSection("admit_card_image");
    }

    if (fullBodyImageFilled < 2) {
      newErrors.fullBodyImage = true;
      scrollToSection("full_body_image");
    }

    if (friendFilled < 2) {
      newErrors.friend = true;
      scrollToSection("friend_info");
    }

    if (emergencyFilled < 2) {
      newErrors.emergency = true;
      scrollToSection("emergency_info");
    }

    if (addressFilled < 4) {
      newErrors.address = true;
      scrollToSection("personal_address");
    }

    if (personalPhoneFilled < 1) {
      newErrors.personalPhone = true;
      scrollToSection("personal_phone");
    }

    if (!form.electricityBill) {
      newErrors.electricity = true;
      scrollToSection("electricity");
    }

    if (ownNidFilled < 2) {
      newErrors.ownNid = true;
      scrollToSection("own_nid");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // API CALL
    console.log("Form Data:", form);
    createVerification(form);
  };

  return (
    <>
      <dialog id="verify_1" className="modal">
        <div className="modal-box">
          <div className="">
            <div className="w-full font-bangla-regular">
              <h1 className=" text-xl">
                ⚠️ আগে শর্ত পড়বেন তারপর ফিলাপ করবেন। সাবধান তথ্যে ভুল করবেন না
              </h1>
              <div className=" text-lg">
                <p> 1. আপনার জমাকৃত তথ্য একটি চুক্তিপত্র।</p>
                <p>2. অতি সুক্ষ ও নির্ভূলভাবে তথ্য জমা করবেন।</p>
                <p>
                  3. ইনফরমেশন জমা দেয়ার পর ইনফরমেশন পরিবর্তন করতে পারবেন না।
                </p>
                <p>4. শুধুমাত্র ফোন নাম্বার ইংরেজিতে লেখবেন, বাকি সব বাংলায়।</p>
                <p>
                  5. একজনের যায়গায় অন্য জনের ফোন নাম্বার দেয়া, কাওকে আত্বীয়
                  বানিয়ে ভেরিফাই এপ্রুপ নেয়ার চেস্টা করা, ভুল তথ্য দিয়ে বলবেন
                  বুঝতে পারিনি এসব তালবাহান করলে প্রতারক হিসাবে গন্য হবেন!
                </p>
                <p className=" mt-4">
                  ★ ১০০% সব তথ্য চেক হবে। কোন ইনফরমেশন ভুল পাওয়া গেলে বা
                  প্রতারনার চেষ্টা করলে সাবস্ক্রিবশন বাতিল হবে সাথে কোন মূল্য
                  ফেরৎ পাবেন না।
                </p>
                <p>আপনি কি এই চুক্তিতে গ্রুপে এড হতে সম্মতি দিচ্ছেন?</p>
              </div>
            </div>
            <div className=" flex items-center gap-2 my-4">
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className=" size-4 "
              />
              <label className="text-sm">
                হ্যাঁ আমি সম্মতি দিচ্ছি, আমি এই চুক্তির শর্তাবলী পড়েছি এবং
                বুঝেছি।
              </label>
            </div>
          </div>

          <div className=" flex items-center justify-end gap-4">
            <button
              className="btn"
              onClick={() => document.getElementById("verify_1").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success "
              disabled={accepted ? false : true}
              onClick={() => {
                document.getElementById("verify_1").close();
                document.getElementById("verify_2").showModal(); // চাইলে পরের modal ওপেন করতে পারো
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="verify_2" className="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-box max-w-2xl h-[80vh] overflow-y-auto">
            <div className="w-full font-bangla-regular">
              {/* form  */}
              <div className=" grid grid-cols-2 gap-4">
                {/* fully required  */}

                <div
                  id="personal_info"
                  className={` col-span-2 ${errors.personalInfo ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      personalInfoFilled >= 6
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    ব্যাক্তিগত তথ্য ({personalInfoFilled}/6)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      আপনার নামঃ
                    </legend>
                    <input
                      type="text"
                      name="userName"
                      onChange={handleChange}
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      আপনার পেশাঃ
                    </legend>
                    <input
                      type="text"
                      name="userOccupation"
                      onChange={handleChange}
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      বাবার নামঃ
                    </legend>
                    <input
                      type="text"
                      name="fatherName"
                      onChange={handleChange}
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      বাবার পেশাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="fatherOccupation"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      মায়ের নামঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="motherName"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      মায়ের পেশাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="motherOccupation"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>

                <div
                  id="personal_address"
                  className={` col-span-2 ${errors.addressInfo ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      addressFilled >= 4 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    স্থায়ী ঠিকানাঃ ({addressFilled}/4)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      গ্রামঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="village"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      পোস্টঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="postOffice"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      থানাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="thana"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      জেলাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="district"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* fully required end */}

                {/* reqired just 1 field from these 3 */}

                <div
                  id="personal_phone"
                  className={` col-span-2 ${errors.personalPhone ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      personalPhoneFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    আপনার ব্যাবহৃত ফোন নাম্বারঃ (কল দিলে যেন আপনাকে পাই) (
                    {personalPhoneFilled}/1)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      নিজ ১ঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="phoneNumberOne"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      নিজ ২:
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="phoneNumberTwo"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      নিজ ৩:
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="phoneNumberThree"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>

                {/* reqired just 1 field from these 3 end */}

                {/* reqired just 1 field from these 3 */}

                <div
                  id="banking"
                  className={` col-span-2 ${errors.banking ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      bankingFilled >= 1 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    নিজ নামে রেজিষ্ট্রেশন করা পার্সোনাল একাউন্ট নাম্বার (নিজ
                    নামে একাউন্ট না থাকলে ব্রাকেটে উক্ত ব্যাক্তির নাম লিখুন) (
                    {bankingFilled}/1)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      বিকাস নাম্বারঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="bkashNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      নগদ নাম্বারঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="nagadNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      রকেট নাম্বারঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="rocketNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>

                {/* reqired just 1 field from these 3 */}

                {/* reqired just 3 field from these 7 */}

                <div
                  id="family"
                  className={` col-span-2 ${errors.family ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      familyFilled >= 2 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    নিজ পরিবারের নাম্বারঃ ({familyFilled}/2)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      মাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="motherNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      বাবাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="fatherNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="brothersNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      বোনঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="sistersNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      চাচাঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="unclesNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      দুলাভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="brothersInLawNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      সশুর/সাসুরিঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="motherInLawNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* reqired just 3 field from these 7 end */}

                {/* reqired just 2 field from these 5 */}

                <div
                  id="friend_info"
                  className={` col-span-2 ${errors.friend ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      friendFilled >= 2 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    ফ্রেন্ড সার্কেল এর নাম্বারঃ ({friendFilled}/2)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      চাচাত ভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="cousinsNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      মামাত ভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="mamatovaisNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ফুপাত ভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="fufatovaisNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ক্লোজ বন্ধুঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="closefriendsNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      Other (নাম +নাম্বর+সম্পর্ক)
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="otherFriendsNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>

                {/* reqired just 2 field from these 5 end */}

                {/* reqired just 2 field from these 5 */}

                <div
                  id="emergency_info"
                  className={` col-span-2 ${errors.emergency ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      emergencyFilled >= 2 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    জরুরি নাম্বারঃ ({emergencyFilled}/2)
                  </h1>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      *বারির পাশে বারি এমন প্রতিবেশিঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="neighboursNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      এলাকার বড় ভাইঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="elakarBoroVairNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      গ্রামের মেম্বারঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="electedMembersNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      গ্রামের চেয়ারমেনঃ
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="electedChairmansNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      Other (নাম +নাম্বর+সম্পর্ক)
                    </legend>
                    <input
                      type="text"
                      className="input"
                      name="otherImportantNumber"
                      onChange={handleChange}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* reqired just 2 field from these 5 end */}

                {/* reqired  */}

                <div
                  id="school_address"
                  className={` col-span-2 ${errors.schoolAddress ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      schoolAddressFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    আপনার স্কুল/ হাইস্কুল/মাদ্রাসার ঠিকানাঃ (
                    {schoolAddressFilled}/1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ঠিকানাঃ
                    </legend>
                    <input
                      type="text"
                      name="schoolAddress"
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* reqired  */}

                {/* reqired  */}

                <div
                  id="college_address"
                  className={` col-span-2 ${errors.collegeAddress ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      collegeAddressFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    উচ্চ মাধ্যমিক কলেজ/মাদ্রাসার ঠিকানাঃ ({collegeAddressFilled}
                    /1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ঠিকানাঃ
                    </legend>
                    <input
                      type="text"
                      name="collegeAddress"
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* reqired  */}

                {/* reqired  */}

                <div
                  id="whatsapp"
                  className={` col-span-2 ${errors.whatsappNumber ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      whatsappFilled >= 1 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    ব্যাবহৃত WhatsApp নাম্বারঃ ({whatsappFilled}/1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      নাম্বারঃ
                    </legend>
                    <input
                      type="text"
                      name="whatsAppNumber"
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* reqired  */}

                {/* reqired  */}

                <div
                  id="ownFacebook"
                  className={` col-span-2 ${errors.ownFacebook ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      ownFacebookFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    নিজ ফেসবুক প্রফাইলের লিংকঃ ({ownFacebookFilled}/1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      লিংকঃ
                    </legend>
                    <input
                      type="text"
                      name="ownFacebookProfile"
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>

                {/* reqired  */}

                {/* optional  */}

                <div
                  id="family_facebook"
                  className={` col-span-2 ${errors.familyFacebook ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      familyFacebookFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    ফেমিলির অন্য কারো ফেইজবুকঃ ({familyFacebookFilled}/1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      লিংকঃ
                    </legend>
                    <input
                      type="text"
                      name="familyFacebookProfile"
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
                {/* optional  */}

                {/* reqired  */}

                <div
                  id="electricity"
                  className={` col-span-2 ${errors.electricity ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      form.electricityBill ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    গত মাসের বিদ্যুৎ বিলের কাগজঃ ({form.electricityBill ? 1 : 0}
                    /1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Pick a file</legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="electricityBill"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>

                {/* reqired  */}

                {/* reqired  both  */}

                <div
                  id="own_nid"
                  className={` col-span-2 ${errors.ownNid ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      ownNidFilled === 2 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    নিজ NID এপিট ওপিঠ ({ownNidFilled}/2)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      সামনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="ownNidFrontImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      পেছনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="ownNidBackImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>

                {/* reqired  both end  */}

                {/* reqired  */}

                <div
                  id="admit_card_image"
                  className={` col-span-2 ${errors.admitCardImage ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      admitCardImageFilled >= 1
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    যেকোনো একটা স্কুল সার্টিফিকেট/এডমিট কার্ড এর ছবিঃ (
                    {admitCardImageFilled}/1)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Pick a file</legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="admitCardImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>

                {/* reqired end */}

                {/* optional  */}

                <div className=" col-span-2">
                  <h1 className=" text-2xl font-semibold text-zinc-700 ">
                    চাকরির Id Card (যদি থাকে)এপিঠ ওপিটঃ
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      সামনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="jobIdCardFrontImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      পেছনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="jobIdCardBackImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>

                {/* optional end */}

                {/* reqired  both  */}

                <div
                  id="family_nid"
                  className={` col-span-2 ${errors.familyNid ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      familyNidFilled >= 2 ? "text-green-600" : "text-zinc-700"
                    }`}
                  >
                    বাবা অথবা মায়ের NID এপিঠ ওপিটঃ ({familyNidFilled}/2)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      সামনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="familyNidFrontImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      পেছনের পিঠের ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="familyNidBackImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                {/* reqired  both  */}

                {/* reqired  both  */}

                <div
                  id="full_body_image"
                  className={` col-span-2 ${errors.fullBodyImage ? "animate-pulse bg-red-100 rounded-lg p-2" : ""}`}
                >
                  <h1
                    className={` text-2xl font-semibold ${
                      fullBodyImageFilled >= 2
                        ? "text-green-600"
                        : "text-zinc-700"
                    }`}
                  >
                    সদ্য তোলা নিজের ১ টা হাফ + ১ টা ফুল ছবিঃ (
                    {fullBodyImageFilled}/2)
                  </h1>
                </div>

                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ১ টা হাফ
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="ownHalfBodyImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                <div className=" col-span-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-[18px] font-medium">
                      ১ টা ফুল ছবি
                    </legend>
                    <input
                      accept="image/*"
                      type="file"
                      name="ownFullBodyImage"
                      onChange={handleFile}
                      className="file-input w-full"
                    />
                    <label className="label">Max size 2MB</label>
                  </fieldset>
                </div>
                {/* reqired  both end*/}
              </div>
              {/* form  end*/}
            </div>

            <div className=" flex items-center justify-end gap-4 mt-4">
              <button
                className="btn"
                onClick={() => document.getElementById("verify_2").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success ">
                {isCreatingVerification ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default VerifyProfileModal;
