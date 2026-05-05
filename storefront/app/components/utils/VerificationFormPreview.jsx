import Image from "next/image";

function VerificationFormPreview({ verificationForm, position }) {
  return (
    <div className="w-full font-bangla-regular">
      <h2 className="text-3xl text-center mb-10 font-bold">
        {position === "admin" ? "" : "আপনার"} জমাক্রিত ভেরিফিকেশন ফরম
      </h2>
      {/* form  */}
      <div className=" grid grid-cols-2 gap-4">
        {/* fully required  */}

        <div id="personal_info" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold`}>ব্যাক্তিগত তথ্য</h1>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              আপনার নামঃ
            </legend>
            <input
              type="text"
              name="userName"
              className="input"
              readOnly
              value={verificationForm?.userName || ""}
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
              className="input"
              readOnly
              value={verificationForm?.userOccupation || ""}
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
              className="input"
              readOnly
              value={verificationForm?.fatherName || ""}
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
              readOnly
              value={verificationForm?.fatherOccupation || ""}
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
              readOnly
              value={verificationForm?.motherName || ""}
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
              readOnly
              value={verificationForm?.motherOccupation || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>

        <div id="personal_address" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>স্থায়ী ঠিকানাঃ</h1>
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
              readOnly
              value={verificationForm?.village || ""}
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
              readOnly
              value={verificationForm?.postOffice || ""}
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
              readOnly
              value={verificationForm?.thana || ""}
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
              readOnly
              value={verificationForm?.district || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* fully required end */}

        {/* reqired just 1 field from these 3 */}

        <div id="personal_phone" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            আপনার ব্যাবহৃত ফোন নাম্বারঃ (কল দিলে যেন আপনাকে পাই)
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
              readOnly
              value={verificationForm?.phoneNumberOne || ""}
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
              readOnly
              value={verificationForm?.phoneNumberTwo || ""}
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
              readOnly
              value={verificationForm?.phoneNumberThree || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>

        {/* reqired just 1 field from these 3 end */}

        {/* reqired just 1 field from these 3 */}

        <div id="banking" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            নিজ নামে রেজিষ্ট্রেশন করা পার্সোনাল একাউন্ট নাম্বার (নিজ নামে
            একাউন্ট না থাকলে ব্রাকেটে উক্ত ব্যাক্তির নাম লিখুন)
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
              readOnly
              value={verificationForm?.bkashNumber || ""}
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
              readOnly
              value={verificationForm?.nagadNumber || ""}
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
              readOnly
              value={verificationForm?.rocketNumber || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>

        {/* reqired just 1 field from these 3 */}

        {/* reqired just 3 field from these 7 */}

        <div id="family" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>নিজ পরিবারের নাম্বারঃ</h1>
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
              readOnly
              value={verificationForm?.motherNumber || ""}
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
              readOnly
              value={verificationForm?.fatherNumber || ""}
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
              readOnly
              value={verificationForm?.brothersNumber || ""}
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
              readOnly
              value={verificationForm?.sistersNumber || ""}
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
              readOnly
              value={verificationForm?.unclesNumber || ""}
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
              readOnly
              value={verificationForm?.brothersInLawNumber || ""}
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
              readOnly
              value={verificationForm?.motherInLawNumber || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* reqired just 3 field from these 7 end */}

        {/* reqired just 2 field from these 5 */}

        <div id="friend_info" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            ফ্রেন্ড সার্কেল এর নাম্বারঃ
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
              readOnly
              value={verificationForm?.cousinsNumber || ""}
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
              readOnly
              value={verificationForm?.mamatovaisNumber || ""}
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
              readOnly
              value={verificationForm?.fufatovaisNumber || ""}
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
              readOnly
              value={verificationForm?.closefriendsNumber || ""}
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
              readOnly
              value={verificationForm?.otherFriendsNumber || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>

        {/* reqired just 2 field from these 5 end */}

        {/* reqired just 2 field from these 5 */}

        <div id="emergency_info" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>জরুরি নাম্বারঃ</h1>
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
              readOnly
              value={verificationForm?.neighboursNumber || ""}
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
              readOnly
              value={verificationForm?.elakarBoroVairNumber || ""}
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
              readOnly
              value={verificationForm?.electedMembersNumber || ""}
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
              readOnly
              value={verificationForm?.electedChairmansNumber || ""}
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
              readOnly
              value={verificationForm?.otherImportantNumber || ""}
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* reqired just 2 field from these 5 end */}

        {/* reqired  */}

        <div id="school_address" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            আপনার স্কুল/ হাইস্কুল/মাদ্রাসার ঠিকানাঃ
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
              readOnly
              value={verificationForm?.schoolAddress || ""}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* reqired  */}

        {/* reqired  */}

        <div id="college_address" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold`}>
            উচ্চ মাধ্যমিক কলেজ/মাদ্রাসার ঠিকানাঃ
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
              readOnly
              value={verificationForm?.collegeAddress || ""}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* reqired  */}

        {/* reqired  */}

        <div id="whatsapp" className={` col-span-2`}>
          <h1 className={` text-2xl font-semibold `}>
            ব্যাবহৃত WhatsApp নাম্বারঃ
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
              readOnly
              value={verificationForm?.whatsAppNumber || ""}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* reqired  */}

        {/* reqired  */}

        <div id="ownFacebook" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            নিজ ফেসবুক প্রফাইলের লিংকঃ
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
              readOnly
              value={verificationForm?.ownFacebookProfile || ""}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
        </div>

        {/* reqired  */}

        {/* optional  */}

        <div id="family_facebook" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            ফেমিলির অন্য কারো ফেইজবুকঃ
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
              readOnly
              value={verificationForm?.familyFacebookProfile || ""}
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        {/* optional  */}

        {/* reqired  */}

        <div id="electricity" className={` col-span-2`}>
          <h1 className={` text-2xl font-semibold `}>
            গত মাসের বিদ্যুৎ বিলের কাগজঃ
          </h1>
        </div>

        <div className=" col-span-2">
          <fieldset className="fieldset">
            <Image
              src={verificationForm?.electricityBill || ""}
              alt="electricity bill"
              width={500}
              height={500}
            />
          </fieldset>
        </div>

        {/* reqired  */}

        {/* reqired  both  */}

        <div id="own_nid" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>নিজ NID এপিট ওপিঠ</h1>
        </div>

        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              সামনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.ownNidFrontImage || ""}
              alt="own NID front image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              পেছনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.ownNidBackImage || ""}
              alt="own NID back image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>

        {/* reqired  both end  */}

        {/* reqired  */}

        <div id="admit_card_image" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            যেকোনো একটা স্কুল সার্টিফিকেট/এডমিট কার্ড এর ছবিঃ
          </h1>
        </div>

        <div className=" col-span-2">
          <fieldset className="fieldset">
            <img
              src={verificationForm?.admitCardImage || ""}
              alt="admit card image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>

        {/* reqired end */}

        {/* optional  */}

        <div className=" col-span-2">
          <h1 className=" text-2xl font-semibold text-zinc-700 ">
            চাকরির Id Card (যদি থাকে)এপিঠ ওপিটঃ
          </h1>
        </div>

        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              সামনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.jobIdCardFrontImage || ""}
              alt="job id card front image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              পেছনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.jobIdCardBackImage || ""}
              alt="job id card back image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>

        {/* optional end */}

        {/* reqired  both  */}

        <div id="family_nid" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            বাবা অথবা মায়ের NID এপিঠ ওপিটঃ
          </h1>
        </div>

        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              সামনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.familyNidFrontImage || ""}
              alt="family NID front image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              পেছনের পিঠের ছবি
            </legend>
            <img
              src={verificationForm?.familyNidBackImage || ""}
              alt="family NID back image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        {/* reqired  both  */}

        {/* reqired  both  */}

        <div id="full_body_image" className={` col-span-2 `}>
          <h1 className={` text-2xl font-semibold `}>
            সদ্য তোলা নিজের ১ টা হাফ + ১ টা ফুল ছবিঃ
          </h1>
        </div>

        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              ১ টা হাফ
            </legend>
            <img
              src={verificationForm?.ownHalfBodyImage || ""}
              alt="own half body image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[18px] font-medium">
              ১ টা ফুল ছবি
            </legend>
            <img
              src={verificationForm?.ownFullBodyImage || ""}
              alt="own full body image"
              width={500}
              height={500}
            />
          </fieldset>
        </div>
        {/* reqired  both end*/}
      </div>
      {/* form  end*/}
    </div>
  );
}

export default VerificationFormPreview;
