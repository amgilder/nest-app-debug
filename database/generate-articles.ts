import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 8,
    min: 4,
  }
});

const generateSlug = (title) => {
  return encodeURIComponent(
        title.toLocaleLowerCase().replaceAll(' ', '-')
      ) + '-' + crypto.randomUUID().split('-')[0];
}

const run = async () => {

  // // Generate some test users
  // for (let i = 1; i <= 10; i++) {
  //   const user = new User();
  //   user.name = `user${i}`;
  //   user.handle = `user${i}`;
  //   user.email = `user${i}@mail.com`;
  //   await userRepository.save(user)

  //   const token = new Token();
  //   token.token = `token-${user.name}`;
  //   token.user = user;
  //   await tokenRepository.save(token);

    for (let j = 0; j < 5; j++) {
      // const article = new Article();
      lorem.format = 'plain';
      const title = lorem.generateWords(5);
      const slug = generateSlug(title);
      lorem.format = 'html';
      const content = lorem.formatString(lorem.generateParagraphs(2));
      // if (j < 4) {
      //   article.published = true;
      //   article.published_at = new Date();
      // }
      // article.user = user;
      // await articleRepository.save(article);
      console.log('title:   ', title);
      // console.log('slug:    ', slug);
      console.log(content);
      console.log();
    }
  }

run();