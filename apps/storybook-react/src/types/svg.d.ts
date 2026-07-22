declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module 'virtual:changelogs' {
  export const changelogs: Record<string, string>;
  export const tagDates: Record<string, string>;
}
