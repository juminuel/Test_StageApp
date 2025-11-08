/*import jwt, {Secret} from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ username, role }: { username: string; role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS || "30d"}h` as string, issuer: 'courses_app' };
    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
*/

import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ username, role }: { username: string; role: Role }): string => {
    // Controleer dat JWT_SECRET aanwezig is
    const secret: Secret = process.env.JWT_SECRET!;
    if (!secret) {
        throw new Error('Missing JWT_SECRET in environment variables');
    }

    // Haal expiresHours op uit env of gebruik fallback (30 dagen)
    const expiresHours = Number(process.env.JWT_EXPIRES_HOURS) || 30 * 24; // in uren
    
    // Opties voor jwt.sign
    const options: SignOptions = {
        expiresIn: expiresHours * 3600, // number in seconden
        issuer: 'courses_app',
    };

    try {
        return jwt.sign({ username, role }, secret, options);
    } catch (error) {
        console.error('JWT generation error:', error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };