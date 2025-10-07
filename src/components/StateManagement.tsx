import { create } from "zustand";

export interface ChildPage {
	id: number;
	title: string;
	// Add other properties as needed
}

interface StateManagementStore {
	childPages: ChildPage[];
	setChildPages: (pages: ChildPage[]) => void;
	openPageId: number | null;
	setOpenPageId: (id: number | null) => void;
	mobileOpenPageId: number | null;
	setMobileOpenPageId: (id: number | null) => void;
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (open: boolean) => void;
}

export const useStateManagementStore = create<StateManagementStore>((set) => ({
	childPages: [],
	setChildPages: (pages) => set({ childPages: pages }),
	openPageId: null,
	setOpenPageId: (id) => set({ openPageId: id }),
	mobileOpenPageId: null,
	setMobileOpenPageId: (id) => set({ mobileOpenPageId: id }),
	mobileMenuOpen: false,
	setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));