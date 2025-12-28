import Image from "next/image";

export function CompanyLogo() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg">
      <Image src="/logo.png" alt="Company Logo" width={48} height={48} />
    </div>
  );
}
