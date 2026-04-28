declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module 'virtual:changelogs' {
  export const reactChangelog: string;
  export const tokensChangelog: string;
  export const utilitiesChangelog: string;
  export const tagDates: Record<string, string>;
}
