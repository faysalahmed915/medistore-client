import AuthButtons from "@/components/layout/auth-buttons";
import { SignOutButton } from "@/components/modules/authentication/sign-out-button";
import AddMedicineForm from "@/components/modules/manageMedicine/AddMedicineForm";
import { UserTest } from "@/components/test/test";

const about = () => {



    return (
        <div>
            This is About Page.
            {/* <UserTest /> */}
            {/* <AuthButtons /> */}
            <SignOutButton />

            <AddMedicineForm />

        </div>
    );
};

export default about;