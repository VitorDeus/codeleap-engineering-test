import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../hooks/useUsername";

export default function SignupPage() {
  const [input, setInput] = useState("");
  const { setUsername } = useUsername();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setUsername(trimmed);
    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#333]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] rounded-2xl bg-white p-6"
      >
        <h1 className="mb-6 text-[22px] font-bold">
          Welcome to CodeLeap network!
        </h1>

        <label className="mb-2 block text-base" htmlFor="username">
          Please enter your username
        </label>
        <input
          id="username"
          type="text"
          placeholder="John doe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-6 w-full rounded-lg border border-[#ccc] px-3 py-2 text-sm placeholder:text-[#ccc] focus:border-[#7695EC] focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={input.trim() === ""}
            className="rounded-lg bg-[#7695EC] px-8 py-2 text-base font-bold text-white uppercase disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}
