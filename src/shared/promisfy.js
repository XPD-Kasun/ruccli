const promisfy = (fn) => {

       return async (...args) => {

              return new Promise((res, rej) => {

                     let argsList = args;
                     argsList.push((err, data) => {

                            if (err) {
                                   rej(err);
                            }
                            else {
                                   res(data)
                            }

                     });
                     fn.apply(null, argsList);

              })
       }
}

export default promisfy;