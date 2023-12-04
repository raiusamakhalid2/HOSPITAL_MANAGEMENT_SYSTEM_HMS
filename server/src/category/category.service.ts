import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
     await this.categoryRepository.save(createCategoryDto)
    return "SuceesFully Catagory Added";
  }

  async findAll() {

    const category = await this.categoryRepository.find();
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async findOne(param: string) {
    const isNumber = !isNaN(parseFloat(param)) && isFinite(+param);
    if(isNumber) {
      const id = +param
    return await this.categoryRepository.findOneBy({id})
    }else{
      return await this.categoryRepository.findOne({where:{name: param}})
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto)
    return this.categoryRepository.findOneBy({id})
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({id})
    await this.categoryRepository.remove(category)
    return 'Category removed successfully';
  }
}
