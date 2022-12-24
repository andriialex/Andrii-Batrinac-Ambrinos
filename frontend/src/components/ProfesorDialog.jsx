import { useEffect } from "react";
import { useState } from "react"

export default function ProfesorDialog(props) {
    var curs = {
        id: "",
        title: "",
        description: "",
        code: "",
        date_start: "",
        date_final: ""
    }

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [code, setCode] = useState('')
    const [date_start, setDate_start] = useState('')
    const [date_final, setDate_final] = useState('')

    useEffect(() => {
        if (props.item) {
            curs = JSON.parse(props.item);
            setId(curs.id)
            setTitle(curs.title)
            setCode(curs.code)
            setDescription(curs.description)
            setDate_start(curs.date_start)
            setDate_final(curs.date_final)
        }
    }, [props.item])


    return (
        <>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
            <div className="m-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{props.mode == 'add' ? 'ADAUGA CURS' : 'EDITEAZA CURS'}</h3>
                            <p className="mt-1 text-sm text-gray-600">{props.mode == 'add' ? 'Te rog completeaza formularul cursului.' : 'Editeaza formularul cursuri cu id ='} {id}</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Titlu</label>
                                            <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
                                                value={title}
                                                onChange={(event) => setTitle(event.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Cod</label>
                                            <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
                                               value={code}
                                               onChange={(event) => setCode(event.target.value)} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Descriere</label>
                                            <input type="text" name="email-address" id="email-address" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12" value={description}
                                                onChange={(event) => setDescription(event.target.value)} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Data si ora start</label>
                                            <input type="datetime-local" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12" value={date_start}
                                                onChange={(event) => setDate_start(event.target.value)} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Data si ora final</label>
                                            <input type="datetime-local" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12" value={date_final}
                                                onChange={(event) => setDate_final(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                                    <button onClick={props.onClose} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-xl text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}
