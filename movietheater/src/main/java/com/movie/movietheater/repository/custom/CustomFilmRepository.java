package com.movie.movietheater.repository.custom;

import com.movie.movietheater.dto.response.SeatFilmResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.Tuple;
import org.springframework.stereotype.Repository;

@Repository
public class CustomFilmRepository {
    @PersistenceContext
    private EntityManager entityManager;

//    public List<SeatFilmResponse> getAllBook() {
//        try {
//            StringBuilder queryStr = new StringBuilder();
//
//            queryStr.append(" SELECT\n" +
//                    "    bo.id, bo.title, bo.description as description, au.id as authorId, au.author_name as authorName, bo.number_of_chapter as numberOfChapter, bo.status, bo.view, \n" +
//                    "    bo.updated_time as updatedTime \n" +
//                    "    FROM sys.book AS bo\n" +
//                    "    INNER JOIN sys.author AS au ON bo.author_id = au.id ");
//
//            Query query = entityManager.createNativeQuery(queryStr.toString(), Tuple.class);
//            List<Tuple> tuples = query.getResultList();
//
//            return tuples.stream().map(e -> CommonUtils.castTupleToGivenType(e, SeatFilmResponse.class)).collect(Collectors.toList());
//        } catch (Exception ex) {
//            throw ex;
//        }
//    }
}
