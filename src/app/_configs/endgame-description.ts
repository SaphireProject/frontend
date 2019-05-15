export interface IEndgameDescription {
  typeOfEndgame;
  imageSrc: string;
  headerOfResult: string;
  description: string;
}

export const endgameMap = new Map();
endgameMap.set('win-me', {
  typeOfEndgame: 'win-me',
  imageSrc: 'assets/images/success.svg',
  headerOfResult: 'YOU WIN',
  description: 'Congratulations, you are the best'
});

endgameMap.set('win-other', {
  typeOfEndgame: 'win-other',
  imageSrc: 'assets/images/game_over.svg',
  headerOfResult: 'GAME OVER',
  description: 'Next time you will get luckier'
});

endgameMap.set('drawn', {
  typeOfEndgame: 'drawn',
  imageSrc: 'assets/images/handshake_vector.svg',
  headerOfResult: 'DRAWN',
  description: 'You are faced with players of your level, friendship won'
});

