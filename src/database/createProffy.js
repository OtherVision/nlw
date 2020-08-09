module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    //inserir dados da tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        )   VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffys_id = insertedProffy.lastID




    //LEMBRAR QUE O MEU ESTÀ DIFERENTE DO QUE O DO PROFESSOR< TROQUEI PROFFY_ID POR PROFFYS_ID



    
    //inserir dados na tabela classes
    const insertedClass = await db.run (`
            INSERT INTO classes (
                subject,
                cost,
                proffys_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffys_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //aqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}