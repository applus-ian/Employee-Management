'use client';

import PersonalInformation from '@/components/profile/personal-information';
import ResidentialInformation from '@/components/profile/residential-information';
import HeadCardInformation from '@/components/profile/head-card-information';
import GovBankNumbers from '@/components/profile/gov-bank-numbers';

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="lg:hidden md:block sm:block ml-20 mb-0 mt-4 text-3xl text-[#EE7A2A] font-bold">
        Employee Profile
      </h1>
      <HeadCardInformation />

      {/* Personal Information */}
      <PersonalInformation />

      {/* Residential Information */}
      <ResidentialInformation />

      {/* Government and Bank Numbers */}
      <GovBankNumbers />
    </div>
  );
}
