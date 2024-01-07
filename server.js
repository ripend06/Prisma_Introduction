const { PrismaClient } = require("@prisma/client"); //prismaClientをもってくる
//expressを使用してサーバー構築
const express = require("express");
const app = express();
const PORT = 8000;


const prisma = new PrismaClient(); //インスタンス化する
app.use(express.json()); //JSON形式で取り扱いますよ


//GET API 全部取得
app.get("/", async (req, res) => {
    const posts = await prisma.posts.findMany(); //findManyですべて取得する
    return res.json(posts);//JSONでPOSTを返す
});

//GET API 一部取得
app.get("/:id", async (req, res) => { //:id特定の記事なので
    const id = req.params.id;//この記述で、:idのIDを取得できる

    const post = await prisma.posts.findUnique({ //findUniqueでどの記事かを選択
        where: {
            id: Number(id), //idは:idで指定するIDを挿入する
        },
    }); //findManyですべて取得する
    return res.json(post);//JSONでPOSTを返す
});


//POST　するAPI作成
app.post("/", async (req, res) => { //req, resを受け取る。/（ルート）ディレクトリで。
    const { title, body } = req.body; //req.bodyはpostmanで挿入するもの。　title, bodyは受けてるもの。
    const posts = await prisma.posts.create({ // //postsはprismaのモデル名。createメソッドでPOSTできる
        data: { //prismaの書き方
            title: title,
            body: body,
        },
    });
    return res.json(posts); //レスポンスをJSONで返す
});


//PUT　するAPI作成
app.put("/:id", async (req, res) => { //req, resを受け取る。/（ルート）ディレクトリで。
    const id = req.params.id;//この記述で、:idのIDを取得できる

    const { body } = req.body; //req.bodyはpostmanで挿入するもの。　title, bodyは受けてるもの。
    const updatePost = await prisma.posts.update({ // //postsはprismaのモデル名。createメソッドでPOSTできる
        where: {
            id: Number(id),
        },
        data: { //prismaの書き方
            body: body,
        },
    });
    return res.json(updatePost); //レスポンスをJSONで返す
});


//DELETE　するAPI作成
app.delete("/:id", async (req, res) => { //req, resを受け取る。/（ルート）ディレクトリで。
    const id = req.params.id;//この記述で、:idのIDを取得できる

    const deletePost = await prisma.posts.delete({ // //postsはprismaのモデル名。createメソッドでPOSTできる
        where: {
            id: Number(id),
        },
    });
    return res.json(deletePost); //レスポンスをJSONで返す
});



app.listen(PORT, () => {
    console.log("サーバーが起動中・・・");
});