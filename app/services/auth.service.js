const { ObjectId } = require("mongodb");

class AuthService {
    constructor(client) {
        this.Auth = client.db().collection("auths");
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        const auth = {
            name: payload.name,
            email: payload.email,
            password: CryptoJS.AES.encrypt(
                payload.password,
                process.env.PASS_SEC
            ).toString(),
        };
        // Remove undefined fields
        Object.keys(auth).forEach(
            (key) => auth[key] === undefined && delete auth[key]
        );
        return auth;
    }

    async create(payload) {
        const auth = this.extractConactData(payload);
        const result = await this.Auth.findOneAndUpdate(
            auth,
            // { $set: { status: auth.status === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Auth.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findByUser(userId) {
        return await this.find({
            userId: { $regex: new RegExp(userId), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Auth.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Auth.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Auth.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
        
    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Auth.deleteMany({});
        return result.deletedCount;
    }
        
}

module.exports = AuthService;