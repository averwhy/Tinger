import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

interface ParsedUsers {
  mods: string[];
  vips: string[];
}

export function parseModsAndVips(rawData: string): ParsedUsers {
  // Extract the HTML content from the JSON structure
  const jsonData = JSON.parse(rawData);
  const htmlContent = jsonData.data;
  
  // Split the content into two sections based on the grid columns
  const gridMatch = htmlContent.match(/<div class="grid gap-10 grid-cols-2">([\s\S]*?)<\/div><\/div><\/div>$/);
  
  if (!gridMatch) {
    return { mods: [], vips: [] };
  }
  
  const gridContent = gridMatch[1];
  
  // Split into two column divs
  const columnMatches = gridContent.match(/<div>([\s\S]*?)<\/div>/g);
  
  if (!columnMatches || columnMatches.length < 2) {
    return { mods: [], vips: [] };
  }
  
  // Extract usernames from <b> tags using regex
  const extractUsernames = (html: string): string[] => {
    const usernameRegex = /<b>(.*?)<\/b>/g;
    const usernames: string[] = [];
    let match;
    
    while ((match = usernameRegex.exec(html)) !== null) {
      usernames.push(match[1]);
    }
    
    return usernames;
  };
  
  const mods = extractUsernames(columnMatches[0]);
  const vips = extractUsernames(columnMatches[1]);
  
  return { mods, vips };
}