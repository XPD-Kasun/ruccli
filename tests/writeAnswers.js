import { stdin } from "mock-stdin";

export default function writeAnswers(stdIn, answerList, interval = 200) {

       let i = 0;

       let runFn = () => {

              setTimeout(()=> {

                     if(i >= answerList.length) {
                            return;
                     }
                     stdIn.send(answerList[i] + '\n');
                     i++;
                     runFn();


              }, interval);
       };

       runFn();

}