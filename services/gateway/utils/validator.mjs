import { ValidationError } from "./error.js";
class Validator {
    validate(schemaName) {
        if (!schemaName) {
            throw new Error("No schema supplied to validator");
        }

        return async (req, res, next) => {
            try {
                const validationTypes = Object.keys(schemaName)
                for (let i = 0; i < validationTypes.length; i++) {
                    let schema = schemaName[validationTypes[i]], content = req[validationTypes[i]];
                    const { error } = schema.validate(content);
                    if (error) {
                        throw new ValidationError(error.details[0].message);
                    }
                }
                next();
            } catch (err) {
                next(err);
            }
        }
    }
}
export default Validator