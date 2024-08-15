import bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        return hashedPassword;
    } catch (error) {
        throw new Error('Password encryption failed');
    }
}

export async function comparePassword(password: string, hashPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, hashPassword);
        return match;
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}
