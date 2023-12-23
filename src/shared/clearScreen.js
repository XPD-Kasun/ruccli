export default function clearScreen() {

       // 2J - Clear entire screen, 3J - Clear saved lines, H - Cursor to home

       console.log('\x1b[2J\x1b[3J\x1b[H');


}