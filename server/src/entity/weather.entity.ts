import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity('weather')
export class WeatherEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column("int")
    temp: number

    @Column("int")
    feels_like: number

    @Column("int")
    temp_min: number

    @Column("int")
    temp_max: number

    @Column("int")
    humidity: number

    @Column("text")
    icon: string

    @Column('int')
    last_get_info: number
}