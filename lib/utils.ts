import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatMoneyInput = (inputValue: any) => {
	if (inputValue == null || isNaN(Number(inputValue))) return "0";

	let value = String(inputValue).replace(/[^0-9.]/g, "");
	let [whole, decimal] = value.split(".");
	whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if (
		event.key === "e" ||
		event.key === "E" ||
		event.key === "-" ||
		event.key === "+"
	) {
		event.preventDefault();
	}
};
