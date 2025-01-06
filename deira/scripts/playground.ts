import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class C {
  id: number;
}

interface IC {
  new (): C;
}

function t<T extends IC>(cl: T) {
  const instance = new cl();
  console.log(Object.getOwnPropertyNames(instance));
}

async function main() {
  t(C);
}

main().then(() => {
  process.exit(0);
});
