export interface ErrorDescrpiption {
  typeOfError: string;
  descriptionOfError: string;
  fullAnnotationOfError: string;
  image: string;
}


export const errorMap = new Map();
errorMap.set('403', {
  typeOfError: '403',
  descriptionOfError: 'Forbidden. Access is denied',
  fullAnnotationOfError: 'You don\'t have permission to access on this place',
  image: 'assets/images/403.svg'
});
errorMap.set('404', {
  typeOfError: '404',
  descriptionOfError: 'These aren\'t the robots you\'re looking for.',
  fullAnnotationOfError: 'The page you\'re looking for does not exist.',
  image: 'assets/images/c3po2.svg'
});
errorMap.set('connection', {
  typeOfError: 'Oops',
  descriptionOfError: 'It seems we have some small troubles with our server',
  fullAnnotationOfError: 'Even robots can be wrong. Please, retry later.',
  image: 'assets/images/server-error.svg'
});
errorMap.set('inner', {
  typeOfError: 'Oops',
  descriptionOfError: 'Something went wrong. It can happen to anyone.',
  fullAnnotationOfError: 'Even  our robots can be wrong. Please, retry later.',
  image: 'assets/images/error2.svg'
});

errorMap.set('410', {
  typeOfError: 'Oops',
  descriptionOfError: 'This battle is no longer available',
  fullAnnotationOfError: 'Unfortunately, this match has already passed, start a new game.',
  image: 'assets/images/error2.svg'
});

