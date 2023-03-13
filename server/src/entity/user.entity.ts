import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text')
    gid: string

    @Column({
        type: 'text',
        nullable: true
    })
    name: string

    @Column({
        type: 'int',
        nullable: true
    })
    age: 1 | 2 | 3 | null

    @Column({
        type: 'int',
        nullable: true
    })
    class: number

    @Column({
        type: 'int',
        nullable: true
    })
    number: number

    @Column({
        type: 'int',
        nullable: true
    })
    barcode: number

    @Column('text')
    email: string

    @Column('text')
    picture: string
}