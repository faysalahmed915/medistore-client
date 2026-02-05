import AuthButtons from "@/components/layout/auth-buttons";
import { SignOutButton } from "@/components/modules/authentication/sign-out-button";
import { UserTest } from "@/components/test/test";

const about = () => {



    return (
        <div>
            This is About Page.
            {/* <UserTest /> */}
            {/* <AuthButtons /> */}
            <SignOutButton />

        </div>
    );
};

export default about;