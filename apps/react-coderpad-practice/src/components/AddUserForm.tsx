
import { useActionState } from "react";

import type { User } from "../types/user";

type AddUserFormProps = {
    onAddUser: (user: User) => Promise<void>;
};

type ActionState = {
    success: boolean
    message: string
} | null;

function AddUserForm({ onAddUser }: AddUserFormProps) {

    async function submitNewUser(_prevState: ActionState, formData: FormData) {

        const fullName = formData.get("name") as string;
        const emailAddress = formData.get("email") as string;

        if (!fullName || !emailAddress) {
            return { success: false, message: "All fields are required." };
        }

        if (!emailAddress.includes("@")) {
            return { success: false, message: "Incorrect email address syntax." };
        }

        try {
            const newUser: User = {
                id: crypto.randomUUID(),
                name: fullName.trim(),
                email: emailAddress.trim(),
            };

            await onAddUser(newUser);

            // React 19 automatically clears uncontrolled inputs when an action returns successfully
            return { success: true, message: "User successfully added." };
        } catch (error) {
            return { success: false, message: "Failed to save user." };
        }
    }

    const [state, formAction, isPending] = useActionState(submitNewUser, null);

    return (
        <>
            <form action={formAction}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input placeholder="Full Name" id="name" name="name" />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input placeholder="Email" id="email" name="email" />
                </div>

                <div>
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>

            {/* Render response feedback */}
            {state && (
                <p className={state.success ? "success-msg" : "error-msg"}>
                    {state.message}
                </p>
            )}
        </>
    )

}

export default AddUserForm;