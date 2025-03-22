import { Button } from "@/components/ui/button";
import { getRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  const role = await getRole();

  if (userId && role) {
    redirect(`/${role}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gradient-to-tl from-blue-200 via-blue-500 to-blue-800">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-white font-bold text-5xl md:text-6xl animate-pulse">
              T-JP
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-bold mb-4  text-white">
      📅 Seamless & Hassle-Free Appointment Booking
    </h1>
    <p className="text-md md:text-lg mb-6 md:max-w-xl font-serif text-white">
      Book your medical appointments effortlessly with our easy-to-use platform. Choose your preferred doctor, select a convenient time, and receive quality care—anytime, anywhere.
    </p>

          <div className="flex gap-4">
            {userId ? (
              <>
                <Link href={`/${role}`}>
                  <Button>View Dashboard</Button>
                </Link>
                {/* <UserButton /> */}
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">
                    New Patient
                  </Button>
                </Link>

                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="md:text-base hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                  >
                    Login to account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-lg font-serif text-white">
          &copy; 2025 T-JP Hospital Management System. All rights reserved by FDN.
        </p>
      </footer>
    </div>
  );
}
