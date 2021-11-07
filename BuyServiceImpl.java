package com.ywh.service.impl;

import com.github.pagehelper.PageHelper;
import com.ywh.domain.Buy;
import com.ywh.mapper.BuyMapper;
import com.ywh.service.BuyService;
import com.ywh.vo.BuyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class BuyServiceImpl implements BuyService {
    @Autowired
    BuyMapper buyMapper;

    @Override
    public List<Buy> findAll(BuyVo buyVo) {
        PageHelper.startPage(buyVo.getPage(),buyVo.getLimit());
        List<Buy> buyList = buyMapper.findAllBuy(buyVo);
        return buyList;
    }

    @Override
    public Integer addBuy(Buy buy) {
        if(buy != null){
            Integer status = buyMapper.addBuy(buy);
            if(status != 0){
                return 1;
            }
            else {
                return 0;
            }

        }
        else{
            return 0;
        }
    }

    @Override
    public Integer updateBuy(Buy buy) {
        if(buy != null){
            Integer status = buyMapper.updateBuy(buy);
            if(status != 0 ){
                return 1;
            }
            else{
                return 0;
            }

        }
        else{
            return 0;
        }
    }

    @Override
    public Integer deleteBuy(int buyid) {
        Integer status = buyMapper.deleteBuy(buyid);
        if(status != 0){
            return 1;
        }
        else{
            return 0;
        }
    }

    @Override
    public Buy findBuyById(int buyid) {
        Buy buy1 = buyMapper.findBuyById(buyid);
        return buy1;
    }
}
