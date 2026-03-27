declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'virtual:changelogs' {
  export const reactChangelog: string;
  export const tokensChangelog: string;
  export const utilitiesChangelog: string;
}
