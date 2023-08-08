import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, CountDownButton, TaskInput, MinutesAmoundInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod' 

// controlled / uncontroled 

// register retorna vários métodos que são utilizados para trabalhar com inputs, como: onChange, onBlur
// data: são os dados dos inputs


const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmound: zod.number().min(5).max(60),
})

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function Home() {
  const { handleSubmit, register, watch } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
  })

  function handleCreateNewCicle(data: NewCicleFormData) {
    console.log(data)
  } 

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
          <MinutesAmoundInput 
           type="number"
           id="minutesAmound" 
           placeholder="00"
           step={5}
           min={5}
           max={60}
           {...register('minutesAmound', { valueAsNumber: true })}
           />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}