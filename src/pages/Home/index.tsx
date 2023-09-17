import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, CountDownButton, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod' 
import { useState } from 'react'

// controlled / uncontroled 

// register retorna vários métodos que são utilizados para trabalhar com inputs, como: onChange, onBlur
// data: são os dados dos inputs


const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesamount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const { handleSubmit, register, watch, reset } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
  })

  function handleCreateNewCicle(data: NewCicleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesamount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle]),
    setActiveCycleId(id),

    reset()
  } 

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesamount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60) /* Transforma em minutos arredondados */
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  console.log(minutes)
  console.log(seconds)

  
  const task = watch('task')
  const isSubmitDisabled = !task;

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}  action="">
        <FormContainer>
          <label>Vou trabalhar em</label>
          <TaskInput
           id="task"
           list="task-suggestions"
           placeholder="Dê um nome para o seu projeto" 
           {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"/>
          </datalist>

          <label>Durante</label>
          <MinutesAmountInput 
           type="number"
           id="minutesAmount" 
           placeholder="00"
           step={5}
           min={5}
           max={60}
           {...register('minutesAmount', { valueAsNumber: true })}
           />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <CountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}
