export const SuscriptionsCard = () => {
    return (
        <div className="w-full ">
            <h1>Tu Plan</h1>
            <div className=" flex flex-col bg-white px-4 py-6 rounded-lg">
                <h1>Plan Estandar</h1>
                <div className="h-[3px] rounded-full w-full bg-button-primary"></div>
                <ul className="px-2">
                    <li>Clases del plan: 10</li>
                    <li>Clases restantes: 3</li>
                </ul>
                <button className="w-full bg-button-primary"><p className="text-white">Más Información</p></button>
            </div>
        </div>

    )
}