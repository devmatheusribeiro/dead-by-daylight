export interface CharacterConfig {
  title: string;
  banner: string;
}

export const CHARACTER_CONFIG: { [key: string]: CharacterConfig } = {
  assassin: {
    title: 'Jogue como um assassino',
    banner: 'killer-banner',
  },
  survivor: {
    title: 'Jogue como um sobrevivente',
    banner: 'survivor-banner',
  },
};
