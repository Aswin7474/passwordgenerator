function PasswordGenerator(settings) {
    const alphabetSmall = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '1234567890';
    const specials = '!@#$%^&*()-+{}[]';

    const combo = []


    if (settings.includeCapital) {
        combo.push(alphabetCaps);
    }
    if (settings.includeSmall) {
        combo.push(alphabetSmall);
    }
    if (settings.includeNumbers){
        combo.push(nums);
    }
    if (settings.includeSpecial) {
        combo.push(specials)
    }

    const getRandom = (len) => {
        return Math.floor(Math.random() * len);
    }
    
    var password = '';
    for (let i = 0; i < settings.length; i++) {
        const whichChar = getRandom(combo.length)
        const lenOfChar = combo[whichChar].length;
        password = password.concat(combo[whichChar][getRandom(lenOfChar)]);
    }
    return password;
    
}

export default PasswordGenerator;
