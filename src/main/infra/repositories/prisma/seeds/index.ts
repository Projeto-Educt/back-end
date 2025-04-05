import { seeds } from './seeds';

seeds()
  .then(() => {
    console.log('Seeds executados com sucesso!');
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
